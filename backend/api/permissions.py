# your_app/permissions.py

from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied
class IsStaffUser(BasePermission):
    """
    Custom permission to only allow users with `is_staff=True` to access the view.
    """

    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.is_staff:
            return True
        raise PermissionDenied("You do not have permission to access this resource.")