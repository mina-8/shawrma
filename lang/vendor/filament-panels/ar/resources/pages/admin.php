<?php
return [
    'title' => 'المشرفون',
    'breadcrumb' => 'المشرفون',
    'actions' => [
        'create' => [
            'label' => 'إضافة مشرف',
        ],
        'edit' => [
            'label' => 'تعديل',
        ],
        'delete' => [
            'label' => 'حذف',
        ],
    ],
    'fields' => [
        'name' => 'الاسم',
        'role' => 'الدور',
        'email' => 'البريد الإلكتروني',
        'created_at' => 'تاريخ الإنشاء',
        'password' => 'كلمة المرور',
    ],
    'roles' => [
        'admin' => 'مشرف',
        'staff' => 'موظف',
    ],
];
