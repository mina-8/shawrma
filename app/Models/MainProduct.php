<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MainProduct extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'content',
        'link',
        'image',
    ];
    public $translatable = ['title', 'content'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
    ];

    protected $guarded = ['id'];

}
