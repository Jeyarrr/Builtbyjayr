import { LayoutGrid, Search, Plus } from "lucide-react";
export default function ProjectArt({ project }) {
  return (
    <div className={`project-art ${project.color}`} aria-hidden="true">
      {project.id === "techora" ? (
        <div className="techora-window">
          <div className="techora-topbar">
            <b>
              techora<span>®</span>
            </b>
            <span>Discover &nbsp; Shop &nbsp; Collections</span>
            <Search size={12} />
          </div>
          <div className="techora-hero">
            <div>
              <small>YOUR NEXT UPGRADE STARTS HERE</small>
              <h4>
                Technology.
                <br />
                <em>All in one place.</em>
              </h4>
              <p>The tools for everything you do next.</p>
              <span className="techora-shop">Explore the collection ↗</span>
            </div>
            <div className="techora-product">
              <img
                src="/techora-laptop.png"
                alt=""
                loading="lazy"
                width="400"
                height="300"
              />
              <span>MADE FOR WHAT’S NEXT.</span>
            </div>
          </div>
          <div className="techora-categories">
            <span>01 / Laptops</span>
            <span>02 / Smartphones</span>
            <span>03 / Audio</span>
            <span>04 / Accessories</span>
          </div>
        </div>
      ) : project.id === "tastenet" ? (
        <div className="orbit-window">
          <aside>
            <b>◉ tastenet</b>
            <span>
              <LayoutGrid size={10} /> Overview
            </span>
            <span>▤ Orders</span>
            <span>◷ Deliveries</span>
            <span>▦ Menu</span>
            <div className="orbit-avatar">J</div>
          </aside>
          <div className="orbit-main">
            <div className="mock-top">
              Order overview <Search size={11} />
            </div>
            <h4>Good food. Great company.</h4>
            <p>A taste of the community, delivered.</p>
            <div className="mock-stats">
              <div>
                <small>Preparing</small>
                <b>
                  08 <span>↗</span>
                </b>
              </div>
              <div>
                <small>Delivered</small>
                <b>
                  24 <span>↗</span>
                </b>
              </div>
              <div>
                <small>New orders</small>
                <b>
                  12 <span>↗</span>
                </b>
              </div>
            </div>
            <h5>
              Recent orders <Plus size={11} />
            </h5>
            <div className="mock-project">
              <i>✳</i>
              <div>
                Family feast<small>Order #1024 · Preparing</small>
              </div>
              <span>75%</span>
            </div>
            <div className="mock-progress">
              <i />
            </div>
            <div className="mock-project">
              <i className="peach">⌘</i>
              <div>
                Lunch favorites<small>Order #1025 · Confirmed</small>
              </div>
              <span>40%</span>
            </div>
          </div>
        </div>
      ) : project.id === "jbnav" ? (
        <div className="store-window">
          <div className="store-nav">
            <b>JB Nav.</b>
            <span>Events&nbsp;&nbsp; Services&nbsp;&nbsp; Contact</span>
          </div>
          <div className="store-body">
            <div>
              <small>MAKE IT MEMORABLE.</small>
              <h4>
                Made for
                <br />
                your special
                <br />
                <em>moments.</em>
              </h4>
              <span>Explore our services ↗</span>
            </div>
            <div className="still-life">
              <div className="sun-disc" />
              <div className="vase">
                <div />
              </div>
              <div className="bowl" />
              <div className="plant-stem" />
            </div>
          </div>
          <div className="store-footer">
            CELEBRATE BEAUTIFULLY. &nbsp; REMEMBER FOREVER.
          </div>
        </div>
      ) : (
        <div className="folio-window">
          <div className="bank-wordmark">
            JBank<span>Banking, with you in mind.</span>
          </div>
          <div className="bank-phone">
            <div className="phone-speaker" />
            <div className="phone-header">
              Hello, Jay-r <span>◉</span>
            </div>
            <div className="bank-balance">
              <small>Total balance</small>
              <b>₱24,850.00</b>
              <span>
                •••• 0428 <i>JBank</i>
              </span>
            </div>
            <div className="bank-actions">
              <span>
                ↗<small>Send</small>
              </span>
              <span>
                +<small>Add money</small>
              </span>
              <span>
                ▦<small>Pay bills</small>
              </span>
            </div>
            <div className="bank-activity">
              Recent activity<span>View all</span>
            </div>
            <div className="bank-transaction">
              <i>↙</i>
              <span>
                Money received<small>Today, 10:24 AM</small>
              </span>
              <b>+₱2,000</b>
            </div>
            <div className="phone-home" />
          </div>
        </div>
      )}
    </div>
  );
}
