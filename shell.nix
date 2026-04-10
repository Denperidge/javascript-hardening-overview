{ pkgs ? import <nixpkgs> {} }:
  
(pkgs.buildFHSEnv {
  name = "js-hardening-overview";
  targetPkgs = pkgs: (with pkgs; [
    corepack
  ]);
}).env
