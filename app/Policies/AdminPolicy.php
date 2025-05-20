<?php

namespace App\Policies;

use App\Models\Admin;

class AdminPolicy
{
    /**
     * Determine if the given admin can delete the target admin.
     */
    public function delete(Admin $user, Admin $target): bool
    {
        // Prevent self-deletion
        if ($user->id === $target->id) {
            return false;
        }
        // Only allow deleting staff, not other admins
        return $target->role === 'staff';
    }
}
