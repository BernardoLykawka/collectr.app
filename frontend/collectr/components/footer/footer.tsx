import { Github, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container mx-auto px-12 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-2 mb-4">
          <div className="flex flex-col gap-2 text-center md:text-left flex-1">
            <h3 className="font-bold text-lg">Collectr</h3>
            <p className="text-sm text-muted-foreground">
              Organize and showcase your collections with ease.
            </p>
          </div>
          <div className="flex flex-col gap-1 text-center flex-1">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              Made with <Heart className="h-3 w-3 fill-current text-red-500" /> by Bernardo Lykawka
            </p>
            <p className="text-xs text-muted-foreground">
              © {currentYear} Collectr. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center md:items-end flex-1">
            <a
              href="https://github.com/bernardoLykawka/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>  
        </div>     
    </footer>
  );
}
