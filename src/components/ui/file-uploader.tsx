/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aDFucFbMyb8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface IFileUploaderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  src?: string;
}

export const FileUploader = React.forwardRef<
  HTMLInputElement,
  IFileUploaderProps
>(({ label, className, src, ...props }, ref) => {
  return (
    <div className={cn(className, "flex  flex-col w-full")}>
      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
        {label}
      </span>
      <Label
        htmlFor="file"
        className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {src && (
          <Image src={src} alt={label} width={0} height={0} className="w-fit" />
        )}

        {!src && (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Paperclip className="w-8 h-8" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Adjuntar archivo</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 px-4">
              Formatos SVG, PNG, JPG
            </p>
          </div>
        )}

        <Input
          className=" hidden"
          ref={ref}
          id="file"
          type="file"
          accept="image/*"
          {...props}
        />
      </Label>
    </div>
  );
});

FileUploader.displayName = "FileUploader";
