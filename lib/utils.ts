import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractMarketplaceId(): string | null {
  const inputElement = document.querySelector<HTMLInputElement>(
    'input[name="marketplaceId"]'
  );
  return inputElement ? inputElement.value : null;
}

export function extractASIN(): string | null {
  const inputElement =
    document.querySelector<HTMLInputElement>('input[name="asin"]');
  return inputElement ? inputElement.value : null;
}
