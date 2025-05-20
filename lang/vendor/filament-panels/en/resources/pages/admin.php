<?php
return [
    'title' => 'Admins',
    'breadcrumb' => 'Admins',
    'actions' => [
        'create' => [
            'label' => 'Add Admin',
        ],
        'edit' => [
            'label' => 'Edit',
        ],
        'delete' => [
            'label' => 'Delete',
        ],
    ],
    'fields' => [
        'name' => 'Name',
        'role' => 'Role',
        'email' => 'Email',
        'created_at' => 'Created At',
        'password' => 'Password',
    ],
    'roles' => [
        'admin' => 'Admin',
        'staff' => 'Staff',
    ],
];
