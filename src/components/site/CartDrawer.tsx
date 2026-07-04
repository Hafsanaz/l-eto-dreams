import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, formatPKR } from "@/lib/cart";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, subtotal, isOpen, close, setQty, remove, count } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-navy/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Cart"
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="eyebrow">Your Selection</p>
            <h2 className="mt-1 font-display text-2xl text-navy">Cart · {count}</h2>
          </div>
          <button
            onClick={close}
            aria-label="Close cart"
            className="rounded-full border border-navy/20 p-2 text-navy hover:bg-powder"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-10 w-10 text-navy/40" />
              <p className="mt-4 font-display text-xl text-navy">Your cart is empty</p>
              <p className="mt-2 text-sm text-navy-soft">Add something sweet from the menu.</p>
              <Link to="/menu" onClick={close} className="btn-navy mt-6">
                Browse Menu
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base text-navy">{item.name}</h3>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-navy/50 hover:text-gold"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-navy-soft">{item.priceLabel}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 border border-navy/20">
                        <button
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="px-2 py-1.5 text-navy hover:bg-powder"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm text-navy">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="px-2 py-1.5 text-navy hover:bg-powder"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-sm text-gold">
                        {formatPKR(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-[0.72rem] uppercase tracking-[0.22em] text-navy-soft">
                Subtotal
              </span>
              <span className="font-display text-xl text-navy">{formatPKR(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-navy-soft">
              Delivery fee calculated at checkout.
            </p>
            <Link to="/checkout" onClick={close} className="btn-navy mt-5 w-full justify-center">
              Checkout
            </Link>
          </footer>
        )}
      </aside>
    </>
  );
}
