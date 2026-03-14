{ pkgs ? import <nixpkgs> {} }:
  
(pkgs.buildFHSEnv {
  name = "js-hardening-overview";
  multiPkgs = pkgs: (with pkgs; [
    corepack
  ]);
}).env