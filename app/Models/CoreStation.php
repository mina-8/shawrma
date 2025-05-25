<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoreStation extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'content',
        'image',
        'stationable_id',
        'stationable_type'
    ];
    public $translatable = ['title' , 'content'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
    ];

    protected $guarded = ['id'];

     public function stationable()
    {
        return $this->morphTo();
    }
}
