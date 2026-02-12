"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogIn, Lock } from "lucide-react";
import { useModal } from "@/contexts/modal-context";

export default function LoginState() {
    const { openModal } = useModal();

    const handleLoginClick = () => {
        openModal();
    };

    return (
        <div>
            <Card className="w-full mx-auto max-w-4xl border-border/80 bg-card/90 shadow-sm border-dashed">
                <CardHeader className="items-start">
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                            <Lock className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-lg font-semibold leading-tight">Login required</p>
                            <p className="text-sm text-muted-foreground">
                                Sign in to view your collections
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        Please log in to access your recently edited collections and manage your items.
                        Create an account if you don&apos;t have one yet.
                    </p>

                    <div className="flex items-center gap-2">
                        <Button 
                            variant="default" 
                            className="gap-2"
                            onClick={handleLoginClick}
                        >
                            <LogIn className="h-4 w-4" />
                            Log In
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
