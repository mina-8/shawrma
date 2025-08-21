<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bransh extends Model
{
    protected $fillable = [
        'content',
        'map',
        'video'
    ];

    protected $casts = [
        'content' => 'array'
    ];
}
