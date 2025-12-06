import { useGlobalContext } from "@/app/providers/Providers";
import Product from "@/types/models/product";
import Image from "next/image";
import AddToCart from "./AddToCart";
import Rating from "./Rating";

interface ProductDetailsProps {
	productId: string;
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
	const { products } = useGlobalContext();
	const product = products.find((p) => p.id === productId);

	// Early return if product is not found
	if (!product) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center">
				<p>Product not found.</p>
			</div>
		);
	}

	const { title, description, price, imageUrl, rating } = product;

	return (
		<div className="min-h-screen w-full p-4 sm:p-8 md:p-12 lg:p-16 pt-32">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-12 lg:gap-16">
				{/* Product Image Section */}
				<div className="w-full flex justify-center items-start">
					<div className="relative aspect-square w-full max-w-md">
						<Image
							src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
							alt={title || "Product Image"}
							layout="fill"
							objectFit="cover"
							className="rounded-lg"
						/>
					</div>
				</div>

				{/* Product Info Section */}
				<div className="flex flex-col mt-6 md:mt-0">
					<Description
						title={title}
						description={description}
						price={price}
						rating={rating}
					/>
					<div className="mt-6">
						<AddToCart product={product} />
					</div>
				</div>
			</div>
		</div>
	);
};

interface DescriptionProps {
	title: string;
	description: string;
	price: number;
	rating: number;
}

const Description = ({
	title,
	description,
	price,
	rating,
}: DescriptionProps) => {
	return (
		<div>
			<h1 className="font-bold text-3xl sm:text-4xl mb-2">{title}</h1>
			<div className="flex items-center gap-4 mb-4">
				<Rating rating={rating} />
				{/* Optional: Display rating value */}
				<span className="text-sm text-gray-500">({rating.toFixed(1)})</span>
			</div>
			<p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
			<span className="font-semibold text-3xl">${price.toFixed(2)}</span>
		</div>
	);
};

export default ProductDetails;
