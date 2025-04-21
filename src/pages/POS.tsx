
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { ShoppingCart, Trash, Plus } from "lucide-react";

type InventoryItem = { id: number; name: string; price: number; stock: number };

const INVENTORY: InventoryItem[] = [
  { id: 1, name: "Paracetamol", price: 2, stock: 50 },
  { id: 2, name: "Ibuprofen", price: 3.5, stock: 30 },
  { id: 3, name: "Aspirin", price: 2.75, stock: 20 },
];

type CartItem = InventoryItem & { quantity: number; };

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (item: InventoryItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        if (existing.quantity < item.stock) {
          return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
        } else {
          toast.error("No more stock available.");
          return prev;
        }
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleRemove = (itemId: number) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast("Cart is empty!", { description: "Add items to checkout." });
      return;
    }
    setCart([]);
    toast("Transaction Complete!", { description: "Your sale has been recorded." });
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <ShoppingCart /> Point of Sale (POS)
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {INVENTORY.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>
                    {item.name}
                    <span className="ml-2 text-xs text-muted-foreground">({item.stock} in stock)</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">${item.price.toFixed(2)}</span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      disabled={
                        cart.find((i) => i.id === item.id)?.quantity === item.stock
                      }
                    >
                      <Plus size={16} /> Add
                    </Button>
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cart</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p className="text-muted-foreground">Cart is empty.</p>
            ) : (
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {item.name} x <strong>{item.quantity}</strong>
                    </span>
                    <span className="flex items-center gap-2">
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleRemove(item.id)}
                        title="Remove from cart"
                      >
                        <Trash size={16} />
                      </Button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex justify-between items-center border-t pt-4">
              <span className="font-semibold">Total:</span>
              <span className="text-lg font-bold">${total.toFixed(2)}</span>
            </div>
            <Button
              className="w-full mt-4"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
