<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slide extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'content',
        'image',
        'str_btn',
        'link'
    ];
    public $translatable = ['title', 'content' , 'str_btn'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
        'str_btn' => 'array'
    ];

    protected $guarded = ['id'];
}
