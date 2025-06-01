<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BuildInformation extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'banner',
        'title',
        'content',
    ];

    public $translatable = ['title' , 'content'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
    ];

    protected $guarded = ['id'];
}
