<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVideo extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'image',
        'youtube_link',
        'productvideoable_id',
        'productvideoable_type'
    ];
    public $translatable = ['image'];

    protected $casts = [
        'image' => 'array',

    ];

    protected $guarded = ['id'];

    public function productvideoable()
    {
        return $this->morphTo();
    }
}
