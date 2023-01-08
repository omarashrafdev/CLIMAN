from rest_framework.views import exception_handler
from rest_framework.response import Response
from logging import getLogger, error


def custom_exception_handler(exc, context):
    logger = getLogger(__name__)

    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    error("Exception in API")
    error(response)
    error(context)
    error(exc)
    
    if response is not None:
        response.data['status_code'] = response.status_code

    return response