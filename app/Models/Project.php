<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'project_location_id',
        'title',
        'content',
        'image',
        'project_name',
        'client_name',
        'location',
        'slug'
    ];

    public $translatable = ['title' , 'content', 'project_name' , 'client_name' , 'location', 'slug'];
    protected $casts = [
        'title' => 'array',
        'content' => 'array',
        'project_name' => 'array',
        'client_name' => 'array',
        'location' => 'array',
        'slug' => 'array',
    ];
    protected $guarded = ['id'];
    public function projectLocation()
    {
        return $this->belongsTo(ProjectLoacation::class, 'project_location_id');
    }
}
