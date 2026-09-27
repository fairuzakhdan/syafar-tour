"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";

import { searchHotels } from "../actions/search-hotels";
import { hotelSearchSchema } from "../schemas/hotel-search.schema";
import type { HotelSearchFormValues } from "../types/hotel-search.types";
import { HotelApiError } from "@/lib/api";
import type { HotelSearchPayload, SearchStatus } from "@/types/common.types";

const DEFAULT_VALUES: HotelSearchFormValues = {
  city: "Makkah",
  checkIn: "2026-11-10",
  checkOut: "2026-11-14",
  pax: 8,
  roomType: "Quad",
};

export function useHotelSearch() {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [result, setResult] = useState<HotelSearchPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const form = useForm<HotelSearchFormValues>({
    resolver: zodResolver(hotelSearchSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  const runSearch = useCallback(async (values: HotelSearchFormValues) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setError(null);

    try {
      const payload = await searchHotels(values, controller.signal);
      if (controller.signal.aborted) return;
      setResult(payload);
      setStatus("success");
    } catch (caught) {
      if (controller.signal.aborted) return;

      if (caught instanceof HotelApiError) {
        setError(caught.message);
      } else if (caught instanceof Error && caught.name === "AbortError") {
        return;
      } else {
        setError("Terjadi kesalahan yang tidak terduga saat mengambil data hotel.");
      }

      setResult(null);
      setStatus("error");
    }
  }, []);

  const onSubmit = useCallback(
    (event?: BaseSyntheticEvent) => form.handleSubmit(runSearch)(event),
    [form, runSearch],
  );

  const retry = useCallback(() => {
    void form.handleSubmit(runSearch)();
  }, [form, runSearch]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return {
    form,
    status,
    result,
    error,
    onSubmit,
    retry,
    reset,
    isLoading: status === "loading",
  };
}

export type UseHotelSearchReturn = ReturnType<typeof useHotelSearch>;
