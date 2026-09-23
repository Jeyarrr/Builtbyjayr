// @vitest-environment jsdom
import React from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { profile } from "./content";

beforeAll(() => {
  window.matchMedia = vi.fn((query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }));
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback) {
        this.callback = callback;
      }
      observe(element) {
        this.callback([
          {
            target: element,
            isIntersecting: true,
            intersectionRatio: 1,
            boundingClientRect: element.getBoundingClientRect(),
          },
        ]);
      }
      unobserve() {}
      disconnect() {}
    },
  );
  // jsdom does not implement native dialog presentation.
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("portfolio interactions", () => {
  it("toggles and persists the color theme without changing motion preferences", async () => {
    const user = userEvent.setup();
    const view = render(<App />);
    expect(document.documentElement.dataset.theme).toBe("light");
    await user.click(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    );
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.bsTheme).toBe("dark");
    expect(localStorage.getItem("builtbyjayr-theme")).toBe("dark");
    expect(localStorage.getItem("builtbyjayr-motion")).toBeNull();
    view.unmount();
    render(<App />);
    expect(
      screen.getByRole("button", { name: "Switch to light mode" }),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: "Switch to light mode" }),
    );
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("builtbyjayr-theme")).toBe("light");
  });

  it("follows system color changes until a visitor chooses a theme", async () => {
    const original = window.matchMedia;
    const listeners = new Set();
    const media = {
      matches: true,
      media: "(prefers-color-scheme: dark)",
      addEventListener: (_, fn) => listeners.add(fn),
      removeEventListener: (_, fn) => listeners.delete(fn),
    };
    window.matchMedia = (query) =>
      query.includes("prefers-color-scheme") ? media : original(query);
    try {
      const user = userEvent.setup();
      render(<App />);
      expect(document.documentElement.dataset.theme).toBe("dark");
      act(() => {
        media.matches = false;
        listeners.forEach((fn) => fn());
      });
      expect(document.documentElement.dataset.theme).toBe("light");
      await user.click(
        screen.getByRole("button", { name: "Switch to dark mode" }),
      );
      act(() => {
        media.matches = true;
        listeners.forEach((fn) => fn());
      });
      act(() => {
        media.matches = false;
        listeners.forEach((fn) => fn());
      });
      expect(document.documentElement.dataset.theme).toBe("dark");
    } finally {
      window.matchMedia = original;
    }
  });

  it("keeps the theme toggle working when preference storage is blocked", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage unavailable");
    });
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    );
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("groups the toolkit correctly and uses the matching brand marks", () => {
    render(<App />);
    const frontend = screen
      .getByRole("heading", { name: "Frontend" })
      .closest(".technology-row");
    const backend = screen
      .getByRole("heading", { name: "Backend" })
      .closest(".technology-row");
    expect(frontend.textContent).toContain("ASP.NET");
    expect(backend.textContent).not.toContain("ASP.NET");
    const deployment = screen
      .getByRole("heading", { name: "Deployment" })
      .closest(".technology-row");
    expect(deployment.textContent).toContain("Azure");
    expect(
      deployment.querySelector('img[src="/icons/azure.svg"]'),
    ).toBeTruthy();
    const tools = screen
      .getByRole("heading", { name: "Tools" })
      .closest(".technology-row");
    expect(tools.querySelector('img[src="/icons/git.svg"]')).toBeTruthy();
    expect(tools.querySelector('img[src="/icons/github.svg"]')).toBeTruthy();
    expect(tools.textContent).toContain("Visual Studio Code");
    expect(tools.querySelector('img[src="/icons/vscode.svg"]')).toBeTruthy();
  });

  it("keeps the section labels and rules without decorative corner numbers", () => {
    const { container } = render(<App />);
    for (const id of ["about", "experience", "work", "skills", "education"]) {
      const section = container.querySelector(`#${id}`);
      expect(section.querySelector(".section-heading-rule")).toBeTruthy();
      expect(section.querySelector(".heading-ghost-number")).toBeNull();
      expect(
        section.querySelector(".editorial-heading h2").textContent.trim(),
      ).not.toBe("");
    }
    expect(
      container.querySelector("#about .portrait").getAttribute("src"),
    ).toBe("/jayr-cutout.png");
    expect(container.querySelectorAll("#about img.portrait")).toHaveLength(1);
  });

  it("presents the requested section order and real TechOra destinations", () => {
    const { container } = render(<App />);
    expect(
      [...container.querySelectorAll("main > section")].map(
        (section) => section.id,
      ),
    ).toEqual([
      "home",
      "about",
      "experience",
      "work",
      "skills",
      "education",
      "contact",
    ]);
    expect(
      screen.getByRole("link", { name: "TechOra: open live site" }).href,
    ).toBe("https://techora-store.vercel.app/");
    expect(
      screen.getByRole("link", { name: "TechOra source on GitHub" }).href,
    ).toBe("https://github.com/Jeyarrr/TechOra");
  });

  it("persists paused motion and keeps all projects usable", async () => {
    const user = userEvent.setup();
    const view = render(<App />);
    await user.click(screen.getByRole("button", { name: "Pause motion" }));
    expect(localStorage.getItem("builtbyjayr-motion")).toBe("paused");
    expect(view.container.querySelector(".motion-root").dataset.motion).toBe(
      "reduced",
    );
    expect(view.container.querySelector(".scroll-progress")).toBeNull();
    await user.click(
      screen.getByRole("button", { name: "View TechOra project details" }),
    );
    expect(screen.getByRole("dialog").open).toBe(true);
    await user.click(
      screen.getByRole("button", { name: "Close project details" }),
    );
    view.unmount();
    render(<App />);
    expect(
      screen
        .getByRole("button", { name: "Enable motion" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    await user.click(screen.getByRole("button", { name: "Enable motion" }));
    expect(localStorage.getItem("builtbyjayr-motion")).toBe("enabled");
  });

  it("responds to changes in the operating system motion preference", () => {
    const original = window.matchMedia;
    const listeners = new Set();
    const media = {
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: (_, listener) => listeners.add(listener),
      removeEventListener: (_, listener) => listeners.delete(listener),
      addListener() {},
      removeListener() {},
    };
    window.matchMedia = (query) =>
      query.includes("prefers-reduced-motion") ? media : original(query);
    try {
      const { container } = render(<App />);
      act(() => {
        media.matches = true;
        listeners.forEach((listener) => listener());
      });
      expect(container.querySelector(".motion-root").dataset.motion).toBe(
        "reduced",
      );
      expect(
        screen.getByRole("button", { name: "Reduced motion enabled by system" })
          .disabled,
      ).toBe(true);
      act(() => {
        media.matches = false;
        listeners.forEach((listener) => listener());
      });
      expect(container.querySelector(".motion-root").dataset.motion).toBe(
        "full",
      );
    } finally {
      window.matchMedia = original;
    }
  });

  it("closes the navigation with Escape and returns focus to its toggle", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    await user.click(toggle);
    await user.keyboard("{Escape}");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
  });

  it("filters real projects and restores the complete collection", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(
      screen.getAllByRole("button", { name: /project details/ }),
    ).toHaveLength(4);
    await user.click(screen.getByRole("button", { name: "Web apps" }));
    await waitFor(() =>
      expect(
        screen.getAllByRole("button", { name: /project details/ }),
      ).toHaveLength(2),
    );
    expect(
      screen.getByRole("button", { name: "View TASTENET project details" }),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "UI / UX" }));
    await waitFor(() =>
      expect(
        screen.getAllByRole("button", { name: /project details/ }),
      ).toHaveLength(1),
    );
    expect(
      screen.getByRole("button", { name: "View JBank project details" }),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: /All work/ }));
    expect(
      screen.getAllByRole("button", { name: /project details/ }),
    ).toHaveLength(4);
  });

  it("opens project details, exposes its real link, and restores focus when closed", async () => {
    const user = userEvent.setup();
    render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    const trigger = screen.getByRole("button", {
      name: "View JBank project details",
    });
    await user.click(trigger);
    expect(screen.getByRole("dialog").open).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
    expect(
      screen.getByRole("link", { name: /View Figma prototype/ }).href,
    ).toContain("figma.com/proto/");
    await user.click(
      screen.getByRole("button", { name: "Close project details" }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe("");
  });

  it("handles the native dialog cancel event", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: "View TASTENET project details" }),
    );
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { bubbles: true }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes mobile navigation after choosing a section", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    await user.click(screen.getByRole("link", { name: "About" }));
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("requires valid contact details and provides the correct email destination", () => {
    render(<App />);
    const email = screen.getByLabelText("Email address");
    const form = email.closest("form");
    expect(form.checkValidity()).toBe(false);
    fireEvent.change(screen.getByLabelText("Your name"), {
      target: { value: "Test visitor" },
    });
    fireEvent.change(email, { target: { value: "invalid" } });
    fireEvent.change(screen.getByLabelText("What are you thinking?"), {
      target: { value: "A portfolio inquiry." },
    });
    expect(form.checkValidity()).toBe(false);
    fireEvent.change(email, { target: { value: "visitor@example.com" } });
    expect(form.checkValidity()).toBe(true);
    expect(
      screen.getByRole("link", { name: profile.email }).getAttribute("href"),
    ).toBe(`mailto:${profile.email}`);
  });

  it("keeps a copyable inquiry if email is unconfigured and clipboard access fails", async () => {
    const originalEmail = profile.email;
    profile.email = "";
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("Clipboard unavailable"),
    );
    try {
      render(<App />);
      await user.type(screen.getByLabelText("Your name"), "Test visitor");
      await user.type(
        screen.getByLabelText("Email address"),
        "visitor@example.com",
      );
      await user.type(
        screen.getByLabelText("What are you thinking?"),
        "A new website.",
      );
      await user.click(
        screen.getByRole("button", { name: "Copy your inquiry" }),
      );
      await waitFor(() =>
        expect(
          screen.getByRole("status", { name: "Contact form status" })
            .textContent,
        ).toContain("nothing has been sent"),
      );
      expect(
        screen.getByLabelText("Your inquiry, ready to copy").value,
      ).toContain("A new website.");
    } finally {
      profile.email = originalEmail;
    }
  });
});
