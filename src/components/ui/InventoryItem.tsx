
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface InventoryItemProps {
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  expiryDate?: string;
  manufacturer?: string;
  lowStock?: boolean;
  expired?: boolean;
  className?: string;
}

const InventoryItem = ({
  name,
  sku,
  category,
  stock,
  price,
  expiryDate,
  manufacturer,
  lowStock,
  expired,
  className,
}: InventoryItemProps) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);

  return (
    <div 
      className={cn(
        "bg-white rounded-lg border p-4 transition-all hover:shadow-md animate-in",
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex-1 mr-4">
          <div className="flex items-center">
            <h3 className="font-medium text-base">{name}</h3>
            {lowStock && <Badge className="ml-2 bg-amber-500">Low Stock</Badge>}
            {expired && <Badge className="ml-2 bg-red-500">Expired</Badge>}
          </div>
          <p className="text-xs text-muted-foreground mt-1">SKU: {sku}</p>
          <div className="flex flex-col sm:flex-row sm:items-center mt-2 gap-2 sm:gap-4">
            <Badge variant="outline" className="inline-flex items-center">
              {category}
            </Badge>
            {manufacturer && (
              <span className="text-xs text-muted-foreground">{manufacturer}</span>
            )}
            {expiryDate && (
              <span className="text-xs text-muted-foreground">Exp: {expiryDate}</span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3 md:mt-0">
          <div className="text-center px-3">
            <p className="text-xs text-muted-foreground">Stock</p>
            <p className={cn(
              "font-medium",
              lowStock ? "text-amber-600" : "",
              stock === 0 ? "text-red-600" : ""
            )}>
              {stock}
            </p>
          </div>
          <div className="text-center px-3">
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-medium">{formattedPrice}</p>
          </div>
          <Button size="sm">Update</Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
