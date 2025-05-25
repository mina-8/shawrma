<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoreVesion extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'content',
        'image',
        'vesionable_id',
        'vesionable_type'
    ];
    public $translatable = ['title' , 'content'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
    ];

    protected $guarded = ['id'];

     public function vesionable()
    {
        return $this->morphTo();
    }
}
