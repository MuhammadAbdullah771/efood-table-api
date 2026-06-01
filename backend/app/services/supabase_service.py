from __future__ import annotations

from typing import Any

import httpx
from supabase import Client, create_client

from app.config import Settings


class SupabaseService:
    def __init__(self, settings: Settings) -> None:
        if not settings.supabase_url or not settings.supabase_key:
            raise ValueError(
                "SUPABASE_URL and SUPABASE_KEY must be set in environment or .env file."
            )
        self._client: Client = create_client(settings.supabase_url, settings.supabase_key)
        self._http = httpx.Client(timeout=30.0)

    def fetch_active_cases(self) -> list[dict[str, Any]]:
        response = (
            self._client.table("cases")
            .select(
                "id, full_name, contact_info, reporter_address, "
                "missing_address, image_url, created_at"
            )
            .order("created_at", desc=True)
            .execute()
        )
        return list(response.data or [])

    def download_image(self, image_url: str) -> bytes:
        download = self._http.get(image_url)
        download.raise_for_status()
        return download.content

    def close(self) -> None:
        self._http.close()
