<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactUs extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'banner',
        'title',
        'addres',
        'phone',
        'fax',
        'map'
    ];
    public $translatable = ['title'];

    protected $casts = [
        'title' => 'array',
    ];

    protected $guarded = ['id'];
}
