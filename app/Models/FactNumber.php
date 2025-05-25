<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FactNumber extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'number',
        'image',
        'factable_id',
        'factable_type'
    ];
    public $translatable = ['title'];

    protected $casts = [
        'title' => 'array',
    ];

    protected $guarded = ['id'];

     public function factable()
    {
        return $this->morphTo();
    }
}
