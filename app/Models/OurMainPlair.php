<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurMainPlair extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'header_title',
        'title',
        'content',
        'image',
        'link'
    ];

    public $translatable = ['header_title' , 'title', 'content' ];

    protected $casts = [
        'header_title' => 'array',
        'title' => 'array',
        'content' => 'array',
    ];

    protected $guarded = ['id'];
}
