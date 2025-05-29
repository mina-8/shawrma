<?php
return [
    'title' => 'Projects',
    'breadcrumb' => 'Projects',
    'actions' => [
        'create' => [
            'label' => 'Add Project',
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
        'body' => 'A project record already exists. You can edit it, but cannot create another.'
    ],
    'fields' => [
        'header' => 'Create Project',
        'description' => 'Description',
        'title' => 'Project Title',
        'story_description' => 'Description',
        'content' => 'Content',
        'image' => 'Image',
        'pdf' => 'Project File',
        'banner' => 'Main Image',
        'project_list' => 'Project List',
        'location' => 'Location',
        'create_vesion' => [
            'header' => 'Create Project Seeds',
            'description' => 'Introductory content for adding project seeds',
            'title' => 'Project Seeds Title',
            'content' => 'Project Seeds Content',
            'add_station' => 'Add Another Project Seed'
        ],
        'create_station' => [
            'header' => 'Create Project Models',
            'description' => 'Introductory content for adding project models',
            'title' => 'Project Models Title',
            'content' => 'Project Models Content',
            'add_station' => 'Add Another Project Model'
        ],
        'created_at' => 'Creation Date',
    ],
];