// ===== CineFlash - Interactividad con jQuery =====

$(document).ready(function () {
  const $reservaModal = new bootstrap.Modal(document.getElementById('reservaModal'));
  let peliculaActual = '';

  // --- Abrir modal al hacer clic en "Reservar" ---
  $('.reservar-btn').on('click', function () {
    peliculaActual = $(this).data('pelicula');
    $('#peliculaSeleccionada').val(peliculaActual);

    // Reiniciar formulario
    $('#horario').prop('selectedIndex', 0);
    $('#asientos').val('');
    $('#formReserva')[0].reset();

    // Quitar posibles clases de validación previas
    $('#formReserva .is-invalid').removeClass('is-invalid');

    $reservaModal.show();
  });

  // --- Confirmar Reserva ---
  $('#confirmarReserva').on('click', function () {
    const hora = $('#horario').val();
    const asientos = $('#asientos').val();
    const tarjeta = $('#formReserva input[type="text"]').eq(0).val();
    const nombreTitular = $('#formReserva input[type="text"]').eq(1).val();
    const cvv = $('#formReserva input[type="text"]').eq(2).val();

    // Validación simple
    let valido = true;
    if (!hora) {
      $('#horario').addClass('is-invalid');
      valido = false;
    } else {
      $('#horario').removeClass('is-invalid');
    }

    if (!asientos || asientos <= 0) {
      $('#asientos').addClass('is-invalid');
      valido = false;
    } else {
      $('#asientos').removeClass('is-invalid');
    }

    if (!tarjeta) {
      $('#formReserva input[type="text"]').eq(0).addClass('is-invalid');
      valido = false;
    } else {
      $('#formReserva input[type="text"]').eq(0).removeClass('is-invalid');
    }

    if (!nombreTitular) {
      $('#formReserva input[type="text"]').eq(1).addClass('is-invalid');
      valido = false;
    } else {
      $('#formReserva input[type="text"]').eq(1).removeClass('is-invalid');
    }

    if (!cvv) {
      $('#formReserva input[type="text"]').eq(2).addClass('is-invalid');
      valido = false;
    } else {
      $('#formReserva input[type="text"]').eq(2).removeClass('is-invalid');
    }

    if (!valido) return; // Detener si algo falta

    $reservaModal.hide();

    // Crear modal de confirmación si aún no existe
    if (!$('#confirmModal').length) {
      const confirmModalHTML = `
      <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title">¡Reserva Confirmada!</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body" id="detalleReserva"></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>`;
      $('body').append(confirmModalHTML);
    }

    // Insertar detalles
    $('#detalleReserva').html(`
      <p><strong>Película:</strong> ${peliculaActual}</p>
      <p><strong>Horario:</strong> ${hora}</p>
      <p><strong>Asientos:</strong> ${asientos}</p>
      <hr>
      <p class="text-success">Pago Procesado (simulado) ✔</p>
    `);

    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    confirmModal.show();
  });
});
