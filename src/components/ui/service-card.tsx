
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  linkText: string;
  linkUrl: string;
  className?: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  linkText,
  linkUrl,
  className,
}: ServiceCardProps) => {
  return (
    <div
      className={cn(
        "card-hover rounded-lg bg-white p-6 shadow-md transition-all",
        className
      )}
    >
      {icon && <div className="mb-4 text-dairy-500">{icon}</div>}
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      <Link
        to={linkUrl}
        className="inline-flex items-center rounded-md bg-dairy-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-dairy-600"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default ServiceCard;
