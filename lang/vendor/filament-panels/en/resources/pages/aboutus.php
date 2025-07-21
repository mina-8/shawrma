<?php
return [
    'title' => 'About us',
    'breadcrumb' => 'About us',
    'actions' => [
        'create' => [
            'label' => 'Add About us',
        ],
        'edit' => [
            'label' => 'Edit',
        ],
        'delete' => [
            'label' => 'Delete',
        ],
    ],
    'Notification' => [
        'title' => 'You cannot create a new record.',
        'body' => 'There is an existing culture record. You can edit it, but you cannot create another one.'
    ],
    'fields' => [
        'header' => 'Create About us',
        'description' => 'Description',
        'title' => 'Culture Title',
        'story_description' => 'Description',
        'content' => 'Content',
        'image' => 'Image',
        'banner' => 'Main Banner',
        'create_vesion' => [
            'header' => 'Create Our Principles',
            'description' => 'Introductory content for adding principles',
            'title' => 'Principles Title',
            'content' => 'Principles Content',
            'add_station' => 'Add Another Principle'
        ],
        'create_station' => [
            'header' => 'Create Our Community Stories',
            'description' => 'Introductory content for adding our community stories',
            'title' => 'Community Stories Title',
            'content' => 'Community Stories Content',
            'add_station' => 'Add Another Story'
        ],
        'created_at' => 'Creation Date',
    ],
];