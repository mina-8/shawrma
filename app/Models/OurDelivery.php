<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurDelivery extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'content',
        'call_us',
        'shop_link',
        'phone',
    ];
    public $translatable = ['title' , 'content' , 'call_us' , 'shop_link'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
        'call_us' => 'array',
        'shop_link' => 'array'
    ];

    protected $guarded = ['id'];


    public function corestation()
    {
        return $this->morphMany(CoreStation::class , 'stationable');
    }

    public function corevesion()
    {
        return $this->morphMany(CoreVesion::class , 'vesionable');
    }
}
