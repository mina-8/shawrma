<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoreStory extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'youtube_link',
        'storyable_id',
        'storyable_type'
    ];
    public $translatable = ['title'];

    protected $casts = [
        'title' => 'array',
    ];

    protected $guarded = ['id'];

     public function storyable()
    {
        return $this->morphTo();
    }
}
