<?php
return [
    'title' => 'Our Promise',
    'breadcrumb' => 'Our Promise',
    'actions' => [
        'create' => [
            'label' => 'Add Our Promise',
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
        'body' => 'There is an existing commitment record. You can edit it, but you cannot create another one.'
    ],
    'fields' => [
        'header' => 'Create Our Promise',
        'description' => 'Description',
        'mainproduct' => 'Main Products List',
        'title' => 'Our Promise Title',
        'story_description' => 'Description',
        'content' => 'Content',
        'image' => 'Image',
        'banner' => 'Main Image',
        'create_vesion' => [
            'header' => 'Create Our Principles',
            'description' => 'Introductory content for adding principles',
            'title' => 'Our Principles Title',
            'content' => 'Our Principles Content',
            'add_station' => 'Add Another Principle'
        ],
        'create_station' => [
            'header' => 'Create Our Values',
            'description' => 'Introductory content for adding our values',
            'title' => 'Our Values Title',
            'content' => 'Our Values Content',
            'add_station' => 'Add Another Value'
        ],
        'create_story' => [
            'header' => 'Create Content for Our Promise',
            'description' => 'Add an introductory story containing a title and video',
            'title' => 'Video Title',
            'video' => 'YouTube Video Link',
            'add_video' => 'Add Another Introductory Video'
        ],
        'created_at' => 'Creation Date',
    ],
];