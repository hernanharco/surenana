// src/components/ClientForm.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ClientForm } from "@/clientsnew/components/ClientForm.jsx";
import { waitFor } from "@testing-library/react";

describe("ClientForm", () => {
  const mockOnSubmit = vi.fn();
  const mockOnClear = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnClear.mockClear();
  });

  test("muestra el título del formulario", () => {
    render(<ClientForm onSubmit={mockOnSubmit} onClear={mockOnClear} />);
    expect(screen.getByText("📝 Registro de Cliente")).toBeInTheDocument();
  });

  test("muestra error si se envía sin nombre", async () => {
    render(<ClientForm onSubmit={mockOnSubmit} onClear={mockOnClear} />);

    const submitButton = screen.getByText("👁️ Ver Vista Previa");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Por favor, ingresa el nombre del cliente.")
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("envía los datos correctamente cuando el nombre está presente", () => {
    render(<ClientForm onSubmit={mockOnSubmit} onClear={mockOnClear} />);

    const nombreInput = screen.getByLabelText("👤 Nombre Completo *");
    fireEvent.change(nombreInput, { target: { value: "Ana López" } });

    const submitButton = screen.getByText("👁️ Ver Vista Previa");
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre: "Ana López",
        tieneSaludDigital: false,
        tieneMascota: false,
        cantidadFamiliar: "", // ✅ Valor real cuando está vacío
        costoTotal: 0, // ✅ Esto sí es 0 porque parseFloat("") → 0
        observaciones: "",
        txtfamiliar1: "",
        txtfamiliar2: "",
      })
    );
  });

  test("incluye tieneSaludDigital como true si está marcado", () => {
    render(<ClientForm onSubmit={mockOnSubmit} onClear={mockOnClear} />);

    const nombreInput = screen.getByLabelText("👤 Nombre Completo *");
    fireEvent.change(nombreInput, { target: { value: "Carlos" } });

    const saludDigitalCheckbox = screen.getByLabelText(/📱 Salud Digital/i);
    fireEvent.click(saludDigitalCheckbox);

    const submitButton = screen.getByText("👁️ Ver Vista Previa");
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre: "Carlos",
        tieneSaludDigital: true,
      })
    );
  });

  test("incluye tieneMascota como true y datos de mascotas si está marcado", () => {
    render(<ClientForm onSubmit={mockOnSubmit} onClear={mockOnClear} />);

    const nombreInput = screen.getByLabelText("👤 Nombre Completo *");
    fireEvent.change(nombreInput, { target: { value: "Lucía" } });

    const mascotaCheckbox = screen.getByLabelText(
      /🐾 Cobertura para Mascotas/i
    );
    fireEvent.click(mascotaCheckbox);

    // Simular cambio en cantidad de mascotas
    const cantidadInput = screen.getByLabelText(
      /¿Cuántas mascotas deseas asegurar?/i
    );
    fireEvent.change(cantidadInput, { target: { value: "2" } });

    const submitButton = screen.getByText("👁️ Ver Vista Previa");
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre: "Lucía",
        tieneMascota: true,
        mascotas: expect.objectContaining({
          cantidad: 2,
          tipos: ["perro", "perro"],
        }),
      })
    );
  });
});
