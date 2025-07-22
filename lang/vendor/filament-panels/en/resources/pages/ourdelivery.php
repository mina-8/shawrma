<?php
return [
    'title' => 'Delivery',
    'breadcrumb' => 'Delivery',
    'actions' => [
        'create' => [
            'label' => 'Add Delivery',
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
        'body' => 'An Delivery record already exists. You can edit it, but cannot create another.'
    ],
    'fields' => [
        'header' => 'Create Delivery',
        'description' => 'Description',
        'title' => 'Delivery Title',
        'story_description' => 'Description',
        'content' => 'Content',
        'image' => 'Image',
        'pdf' => 'Delivery File',
        'banner' => 'Main Image',
        'create_vesion' => [
            'header' => 'Create Delivery Seeds',
            'description' => 'Introductory content for adding Delivery seeds',
            'title' => 'Delivery Seeds Title',
            'content' => 'Delivery Seeds Content',
            'add_station' => 'Add Another Delivery Seed'
        ],
        'create_station' => [
            'header' => 'Create Delivery Models',
            'description' => 'Introductory content for adding Delivery models',
            'title' => 'Delivery Models Title',
            'content' => 'Delivery Models Content',
            'add_station' => 'Add Another Delivery Model'
        ],
        'created_at' => 'Creation Date',
    ],
];