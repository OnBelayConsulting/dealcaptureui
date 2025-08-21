import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  __: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  for (const role of grantedRoles.resourceRoles['dealcaptureui']) {
    if (role.toUpperCase().includes('ADMIN'))
      return true;
  }

     const requiredRole= route.data['role'];

  if (!requiredRole) {
    return true;
  }

  let hasRole = false;
  for (const role of grantedRoles.resourceRoles['dealcaptureui']) {
    if (role === requiredRole) {
      hasRole = true;
      break;
    }

  }


  if (authenticated && hasRole) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/forbidden');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
