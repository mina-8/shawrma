<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoreSustainability extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'content',
        'image',
        'color',
        'sustainable_id',
        'sustainable_type'
    ];
    public $translatable = ['title', 'content'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
    ];


    protected $guarded = ['id'];

    public function sustainable()
    {
        return $this->morphTo();
    }
}
