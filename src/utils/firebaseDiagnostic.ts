import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ProductService } from "../services/firestore";

export interface DiagnosticResult {
  success: boolean;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

export interface FirebaseDiagnosticReport {
  overall: "success" | "warning" | "error";
  tests: {
    firebaseConfig: DiagnosticResult;
    firestoreConnection: DiagnosticResult;
    firestoreRules: DiagnosticResult;
    productCollection: DiagnosticResult;
    dataAccess: DiagnosticResult;
  };
  recommendations: string[];
  summary: string;
}

class FirebaseDiagnostic {
  private static instance: FirebaseDiagnostic;

  static getInstance(): FirebaseDiagnostic {
    if (!FirebaseDiagnostic.instance) {
      FirebaseDiagnostic.instance = new FirebaseDiagnostic();
    }
    return FirebaseDiagnostic.instance;
  }

  // Test Firebase configuration
  async testFirebaseConfig(): Promise<DiagnosticResult> {
    try {
      // Check if Firebase is properly initialized
      if (!db) {
        return {
          success: false,
          message: "Firebase no está inicializado correctamente",
          details: "La configuración de Firebase no se cargó",
          timestamp: new Date(),
        };
      }

      // Check if we're in the right project
      const projectId = db.app.options.projectId;
      if (projectId !== "titirosa-a3873") {
        return {
          success: false,
          message: "Proyecto Firebase incorrecto",
          details: `Proyecto actual: ${projectId}, esperado: titirosa-a3873`,
          timestamp: new Date(),
        };
      }

      return {
        success: true,
        message: "Configuración de Firebase válida",
        details: { projectId, appName: db.app.name },
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        message: "Error en la configuración de Firebase",
        details: error instanceof Error ? error.message : "Error desconocido",
        timestamp: new Date(),
      };
    }
  }

  // Test Firestore connection
  async testFirestoreConnection(): Promise<DiagnosticResult> {
    try {
      // Try to access a simple collection
      const testCollection = collection(db, "test");

      // This will trigger a connection attempt
      const snapshot = await getDocs(testCollection);

      return {
        success: true,
        message: "Conexión a Firestore exitosa",
        details: {
          connected: true,
          canRead: true,
          emptyCollection: snapshot.empty,
        },
        timestamp: new Date(),
      };
    } catch (error: unknown) {
      let message = "Error de conexión a Firestore";
      let details =
        error instanceof Error ? error.message : "Error desconocido";

      if (error && typeof error === "object" && "code" in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code === "permission-denied") {
          message = "Permisos denegados en Firestore";
          details = "Verifica las reglas de seguridad de Firestore";
        } else if (firebaseError.code === "unavailable") {
          message = "Firestore no disponible";
          details = "Verifica tu conexión a internet o el estado del servicio";
        }
      }

      return {
        success: false,
        message,
        details,
        timestamp: new Date(),
      };
    }
  }

  // Test Firestore security rules
  async testFirestoreRules(): Promise<DiagnosticResult> {
    try {
      // Test read access to products collection
      const productsCollection = collection(db, "products");
      await getDocs(productsCollection);

      // Test if we can read (this should work with current rules)
      const canRead = true;

      // Try to detect if we're in emulator mode
      const isEmulator = window.location.hostname === "localhost";

      return {
        success: true,
        message: "Reglas de Firestore funcionando correctamente",
        details: {
          canRead,
          isEmulator,
          rulesApplied: true,
        },
        timestamp: new Date(),
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: "Error en las reglas de Firestore",
        details:
          error &&
          typeof error === "object" &&
          "code" in error &&
          (error as { code: string }).code === "permission-denied"
            ? "Las reglas de seguridad están bloqueando el acceso"
            : error instanceof Error
              ? error.message
              : "Error desconocido",
        timestamp: new Date(),
      };
    }
  }

  // Test products collection access
  async testProductCollection(): Promise<DiagnosticResult> {
    try {
      const products = await ProductService.getAllProducts();

      if (products.length === 0) {
        return {
          success: false,
          message: "Colección de productos está vacía",
          details: "Necesitas migrar los datos locales a Firestore",
          timestamp: new Date(),
        };
      }

      // Test different product operations
      const featuredProducts = products.filter((p) => p.featured);
      const availableProducts = products.filter((p) => p.available);
      const categories = [...new Set(products.map((p) => p.category))];

      return {
        success: true,
        message: "Colección de productos accesible",
        details: {
          totalProducts: products.length,
          featuredProducts: featuredProducts.length,
          availableProducts: availableProducts.length,
          categories: categories.length,
          sampleCategories: categories.slice(0, 3),
        },
        timestamp: new Date(),
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: "Error accediendo a la colección de productos",
        details: error instanceof Error ? error.message : "Error desconocido",
        timestamp: new Date(),
      };
    }
  }

  // Test data access and CRUD operations
  async testDataAccess(): Promise<DiagnosticResult> {
    try {
      // Test read operations
      const canRead = await this.testReadOperation();

      // Test search functionality
      const canSearch = await this.testSearchOperation();

      // Test category filtering
      const canFilter = await this.testFilterOperation();

      const allTestsPassed = canRead && canSearch && canFilter;

      return {
        success: allTestsPassed,
        message: allTestsPassed
          ? "Todas las operaciones de datos funcionan correctamente"
          : "Algunas operaciones de datos fallan",
        details: {
          canRead,
          canSearch,
          canFilter,
          recommendation: !allTestsPassed
            ? "Revisa la conexión a Firestore y las reglas de seguridad"
            : "Sistema funcionando correctamente",
        },
        timestamp: new Date(),
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: "Error en las operaciones de datos",
        details: error instanceof Error ? error.message : "Error desconocido",
        timestamp: new Date(),
      };
    }
  }

  private async testReadOperation(): Promise<boolean> {
    try {
      const products = await ProductService.getAllProducts();
      return products !== null;
    } catch {
      return false;
    }
  }

  private async testSearchOperation(): Promise<boolean> {
    try {
      const results = await ProductService.searchProducts("tarta");
      return Array.isArray(results);
    } catch {
      return false;
    }
  }

  private async testFilterOperation(): Promise<boolean> {
    try {
      const results = await ProductService.getProductsByCategory("tartas");
      return Array.isArray(results);
    } catch {
      return false;
    }
  }

  // Run complete diagnostic
  async runCompleteDiagnostic(): Promise<FirebaseDiagnosticReport> {
    console.log("🔍 Iniciando diagnóstico de Firebase...");

    const tests = {
      firebaseConfig: await this.testFirebaseConfig(),
      firestoreConnection: await this.testFirestoreConnection(),
      firestoreRules: await this.testFirestoreRules(),
      productCollection: await this.testProductCollection(),
      dataAccess: await this.testDataAccess(),
    };

    // Determine overall status
    const successCount = Object.values(tests).filter(
      (test) => test.success,
    ).length;
    const totalTests = Object.keys(tests).length;

    let overall: "success" | "warning" | "error";
    if (successCount === totalTests) {
      overall = "success";
    } else if (successCount >= totalTests * 0.6) {
      overall = "warning";
    } else {
      overall = "error";
    }

    // Generate recommendations
    const recommendations = this.generateRecommendations(tests);

    // Create summary
    const summary = this.generateSummary(overall, successCount, totalTests);

    const report: FirebaseDiagnosticReport = {
      overall,
      tests,
      recommendations,
      summary,
    };

    console.log("📊 Diagnóstico completado:", report);
    return report;
  }

  private generateRecommendations(
    tests: FirebaseDiagnosticReport["tests"],
  ): string[] {
    const recommendations: string[] = [];

    if (!tests.firebaseConfig.success) {
      recommendations.push(
        "Verifica la configuración de Firebase en src/config/firebase.ts",
      );
    }

    if (!tests.firestoreConnection.success) {
      recommendations.push(
        "Verifica tu conexión a internet y el estado de Firebase",
      );
      recommendations.push(
        "Intenta reiniciar la aplicación o limpiar el cache del navegador",
      );
    }

    if (!tests.firestoreRules.success) {
      recommendations.push("Actualiza las reglas de seguridad de Firestore");
      recommendations.push("Ejecuta: npm run firebase:deploy:rules");
    }

    if (!tests.productCollection.success) {
      recommendations.push(
        "Migra los datos locales a Firestore usando el panel de administración",
      );
      recommendations.push('Ve a /admin y usa la función "Migrar Datos"');
    }

    if (!tests.dataAccess.success) {
      recommendations.push(
        "Verifica las reglas de Firestore y los permisos de lectura",
      );
      recommendations.push(
        "Revisa la consola del navegador para errores específicos",
      );
    }

    if (recommendations.length === 0) {
      recommendations.push("¡Sistema funcionando perfectamente! 🎉");
      recommendations.push(
        "Considera monitorear el rendimiento en Firebase Console",
      );
    }

    return recommendations;
  }

  private generateSummary(
    overall: string,
    successCount: number,
    totalTests: number,
  ): string {
    const percentage = Math.round((successCount / totalTests) * 100);

    switch (overall) {
      case "success":
        return `✅ Sistema Firebase funcionando correctamente (${successCount}/${totalTests} pruebas exitosas)`;
      case "warning":
        return `⚠️ Sistema Firebase funcionando parcialmente (${successCount}/${totalTests} pruebas exitosas, ${percentage}%)`;
      case "error":
        return `❌ Sistema Firebase con problemas significativos (${successCount}/${totalTests} pruebas exitosas, ${percentage}%)`;
      default:
        return `Estado desconocido (${successCount}/${totalTests} pruebas exitosas)`;
    }
  }

  // Quick health check for monitoring
  async quickHealthCheck(): Promise<boolean> {
    try {
      const products = await ProductService.getAllProducts();
      return products.length > 0;
    } catch {
      return false;
    }
  }

  // Get environment info
  getEnvironmentInfo() {
    return {
      hostname: window.location.hostname,
      isLocalhost: window.location.hostname === "localhost",
      isProduction: window.location.hostname !== "localhost",
      firebaseProject: db.app.options.projectId,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };
  }
}

// Export singleton instance
export const firebaseDiagnostic = FirebaseDiagnostic.getInstance();

// Utility functions for components
export const runFirebaseDiagnostic =
  async (): Promise<FirebaseDiagnosticReport> => {
    return await firebaseDiagnostic.runCompleteDiagnostic();
  };

export const checkFirebaseHealth = async (): Promise<boolean> => {
  return await firebaseDiagnostic.quickHealthCheck();
};

export const getFirebaseEnvironmentInfo = () => {
  return firebaseDiagnostic.getEnvironmentInfo();
};

// Console command for debugging
if (typeof window !== "undefined") {
  (window as Record<string, unknown>).firebaseDiagnostic = {
    run: runFirebaseDiagnostic,
    health: checkFirebaseHealth,
    env: getFirebaseEnvironmentInfo,
  };
}

export default firebaseDiagnostic;
