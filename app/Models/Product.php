<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [

        'title',
        'image',
        'link'
    ];
    public $translatable = ['title'];

    protected $casts = [
        'title' => 'array',

    ];

    protected $guarded = ['id'];

}
