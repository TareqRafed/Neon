from rest_framework.pagination import (
    LimitOffsetPagination,
    PageNumberPagination,
)


class ArtworkPageNumberPagination(PageNumberPagination):
    page_size = 10