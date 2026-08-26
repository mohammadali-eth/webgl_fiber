'use client';

import React from 'react';

/**
 * Scene Loader component placeholder for loading 3D assets & GLTF models.
 */
export function SceneLoader() {
  return (
    <div className="flex items-center justify-center p-4">
      <span className="text-sm font-medium text-muted-foreground animate-pulse">
        Loading 3D Environment...
      </span>
    </div>
  );
}

export default SceneLoader;
