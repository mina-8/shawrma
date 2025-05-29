<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectLoacation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $appLang = app()->getLocale();
        $projectLoactions = ProjectLoacation::all()->map(function ($location) use ($appLang) {
            return [
                'id' => $location->id,
                'location' => $location->getTranslation('location', $appLang),

            ];
        });
        $projects = Project::latest()->select('id' , 'title' , 'image' , 'location' , 'slug')->get()
            ->map(function ($project) use ($appLang) {
                return [
                    'id' => $project->id,
                    'title' => $project->getTranslation('title', $appLang),
                    'image' => Storage::url($project->image),
                    'location' => $project->getTranslation('location', $appLang),
                    'slug' => $project->getTranslation('slug', $appLang),
                ];
            });

        return Inertia::render('Welcome/Projects/Index', ['projects' => $projects, 'projectLoactions' => $projectLoactions]);
    }

    public function show(string $lang, string $slug)
    {
        $project = Project::where("slug->$lang", $slug)->first();
        if (!$project) {
            abort(404);
        }
        $slugs = $project->getTranslations('slug');

        $otherPrjects = Project::whereNot('id', $project->id)
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($project) use ($lang) {
                return [
                    'id' => $project->id,
                    'title' => $project->getTranslation('title', $lang),
                    'image' => Storage::url($project->image),
                    'slug' => $project->getTranslation('slug', $lang),
                ];
            });

        $dataPorject = [
            'id' => $project->id,
            'title' => $project->getTranslation('title', $lang),
            'content' => $project->getTranslation('content', $lang),
            'image' => Storage::url($project->image),
            'project_name' => $project->getTranslation('project_name', $lang),
            'client_name' => $project->getTranslation('client_name', $lang),
            'location' => $project->getTranslation('location', $lang),
            'slug' => $project->getTranslation('slug', $lang),
        ];

        return Inertia::render('Welcome/Projects/Show', [
            'project' => $dataPorject,
            'otherProjects' => $otherPrjects,
            'slugs' => $slugs
        ]);
    }

    public function filter(string $lang, Request $request)
    {
        
        $qeury = Project::query();
        if ($request->has('location')) {
            $location = $request->input('location');
            $qeury->where("project_location_id", $location);
        }

        $projects =  $qeury->select('id' , 'title' , 'image' , 'location' , 'slug')->get()
            ->map(function ($project) use ($lang) {
                return [
                    'id' => $project->id,
                    'title' => $project->getTranslation('title', $lang),
                    'image' => Storage::url($project->image),
                    'location' => $project->getTranslation('location', $lang),
                    'slug' => $project->getTranslation('slug', $lang),
                ];
            });
        return response()->json([
            'projects' => $projects
        ]);
    }
}
