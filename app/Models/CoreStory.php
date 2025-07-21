<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoreStory extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'content',
        'image',
        'storyable_id',
        'storyable_type'
    ];
    public $translatable = ['title', 'content'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
    ];


    protected $guarded = ['id'];

    public function storyable()
    {
        return $this->morphTo();
    }
}
