<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'facts',
        'image',

    ];
    public $translatable = ['title'];

    protected $casts = [
        'title' => 'array',
    ];

    protected $guarded = ['id'];
}
