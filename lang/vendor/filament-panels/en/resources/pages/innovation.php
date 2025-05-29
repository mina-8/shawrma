<?php
return [
    'title' => 'Innovation',
    'breadcrumb' => 'Innovation',
    'actions' => [
        'create' => [
            'label' => 'Add Innovation',
        ],
        'edit' => [
            'label' => 'Edit',
        ],
        'delete' => [
            'label' => 'Delete',
        ],
    ],
    'Notification' => [
        'title' => 'Cannot create a new record.',
        'body' => 'An innovation record already exists. You can edit it, but cannot create another.'
    ],
    'fields' => [
        'header' => 'Create Innovation',
        'description' => 'Description',
        'title' => 'Innovation Title',
        'story_description' => 'Description',
        'content' => 'Content',
        'image' => 'Image',
        'pdf' => 'Innovation File',
        'banner' => 'Main Image',
        'create_vesion' => [
            'header' => 'Create Innovation Seeds',
            'description' => 'Introductory content for adding innovation seeds',
            'title' => 'Innovation Seeds Title',
            'content' => 'Innovation Seeds Content',
            'add_station' => 'Add Another Innovation Seed'
        ],
        'create_station' => [
            'header' => 'Create Innovation Models',
            'description' => 'Introductory content for adding innovation models',
            'title' => 'Innovation Models Title',
            'content' => 'Innovation Models Content',
            'add_station' => 'Add Another Innovation Model'
        ],
        'created_at' => 'Creation Date',
    ],
];