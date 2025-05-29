<?php
return [
    'title' => 'Sustainability',
    'breadcrumb' => 'Sustainability',
    'actions' => [
        'create' => [
            'label' => 'Add Sustainability',
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
        'body' => 'There is an existing sustainability record. You can edit it, but you cannot create another one.'
    ],
    'fields' => [
        'header' => 'Create Sustainability',
        'description' => 'Description',
        'title' => 'Sustainability Title',
        'story_description' => 'Description',
        'content' => 'Content',
        'image' => 'Image',
        'pdf' => 'Sustainability File',
        'banner' => 'Main Image',
        'create_vesion' => [
            'header' => 'Create Growth Seeds',
            'description' => 'Introductory content for adding growth seeds',
            'title' => 'Growth Seeds Title',
            'content' => 'Growth Seeds Content',
            'add_station' => 'Add another Growth Seed'
        ],
        'create_station' => [
            'header' => 'Create Sustainability Models',
            'description' => 'Introductory content for adding sustainability models',
            'title' => 'Sustainability Models Title',
            'content' => 'Sustainability Models Content',
            'add_station' => 'Add another Sustainability Model'
        ],
        'created_at' => 'Creation Date',
    ],
];