"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FaHome,
  FaBuilding,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCar,
  FaTimes,
} from "react-icons/fa";
import { Property } from "@/types";
import { userApi } from "@/lib/api/user";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ViewImagesModalProps {
  property: Property | "[]";
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewImagesModal({
  property,
  isOpen,
  onClose,
}: ViewImagesModalProps) {
  // console.log("agent founded", agent);
  // Get agentId from property
  // const agentId = property?.agents;
  console.log("imagase founded", property);

  if (!property) return null;

  const images = property.images || [];
  console.log("images founded here:", images);
  // const images = Array.isArray(property?.images) ? property.images : [];
  //   console.log("images founded", images);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[95%] max-w-7xl max-h-[100vh] rounded-none overflow-y-auto bg-gradient-to-br from-slate-50 to-white">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-slate-200 pb-4">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Property Details
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-slate-100 rounded-full"
          >
            <FaTimes className="w-5 h-5 text-slate-500" />
          </Button>
        </DialogHeader>

        <div className="space-y-8 pt-6">
          <div className="flex">
            <div className="space-y-4">
              {/* First 2 images full width */}
              <div className="grid grid-cols-1 gap-4">
                {images.slice(0, 1).map((img: string, index: number) => (
                  <img
                    key={`first-${index}`}
                    src={`${process.env.NEXT_PUBLIC_PICTURES_URL}${img}`}
                    alt={property.title}
                    className="w-full h-[700px] object-cover "
                  />
                ))}
              </div>

              {/* Next 2 images side by side */}
              <div className="grid grid-cols-2 gap-4">
                {images.slice(1, 3).map((img: string, index: number) => (
                  <img
                    key={`second-${index}`}
                    src={`${process.env.NEXT_PUBLIC_PICTURES_URL}${img}`}
                    alt={property.title}
                    className="w-full h-[700px] object-cover "
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {images.slice(0, 1).map((img: string, index: number) => (
                  <img
                    key={`first-${index}`}
                    src={`${process.env.NEXT_PUBLIC_PICTURES_URL}${img}`}
                    alt={property.title}
                    className="w-full h-[700px] object-cover "
                  />
                ))}
              </div>

              {/* Next 2 images side by side */}
              <div className="grid grid-cols-2 gap-4">
                {images.slice(1, 3).map((img: string, index: number) => (
                  <img
                    key={`second-${index}`}
                    src={`${process.env.NEXT_PUBLIC_PICTURES_URL}${img}`}
                    alt={property.title}
                    className="w-full h-[700px] object-cover "
                  />
                ))}
              </div>

              {/* Remaining images (optional) */}
              {/* {images.length > 4 && (
                <div className="grid grid-cols-3 gap-4">
                  {images.slice(4).map((img: string, index: number) => (
                    <img
                      key={`rest-${index}`}
                      src={`${process.env.NEXT_PUBLIC_PICTURES_URL}${img}`}
                      alt={property.title}
                      className="w-full h-[300px] object-cover rounded-lg"
                    />
                  ))}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
