import six
from django.contrib.auth.tokens import PasswordResetTokenGenerator

class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def make_hash_value (self, user, timestamp):
        return (
            six.text_type(user.id) + six.text_type(timestamp) + six.text_type(user.status)
        )


account_activation_token = AccountActivationTokenGenerator()