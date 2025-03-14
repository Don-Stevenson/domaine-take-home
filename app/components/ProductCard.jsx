import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

export function ProductCard({product}) {
  if (!product) {
    console.error('Product data is missing');
    return null;
  }

  const {title, handle, featuredImage, priceRange} = product;

  return (
    <div className="group relative">
      <Link to={`/products/${handle}`} className="block">
        <div className="border border-[#E8E8E8] rounded-[10px] p-[1.25rem] flex items-center justify-center bg-white">
          <div className="overflow-hidden flex items-center justify-center">
            {featuredImage && (
              <Image
                data={featuredImage}
                className="w-[17.188rem] h-auto"
                alt={title}
              />
            )}
          </div>
        </div>
      </Link>

      <div className="mt-4">
        <h3 className="text-base font-medium text-gray-900 mt-1">{title}</h3>
        <div className="mt-1 flex items-center">
          <span className="font-medium">
            {priceRange?.minVariantPrice && (
              <Money data={priceRange.minVariantPrice} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
