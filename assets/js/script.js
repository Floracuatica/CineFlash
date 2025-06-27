// ===== CineFlash - Interactividad con jQuery =====

$(function () {
  const reservaModalEl = document.getElementById('reservaModal');
  const reservaModal = new bootstrap.Modal(reservaModalEl);

  let peliculaActual = '';

  // --- Abrir modal al hacer clic en "Reservar" ---
  $('.reservar-btn').on('click', function () {
    peliculaActual = $(this).data('pelicula');

    // Reiniciar formulario y limpiar validaciones previas
    $('#formReserva')[0].reset();
    $('#peliculaSeleccionada').val(peliculaActual);
    $('#formReserva .is-invalid').removeClass('is-invalid');

    reservaModal.show();
  });

  // --- Confirmar Reserva ---
  $('#confirmarReserva').on('click', function (e) {
    e.preventDefault(); // evitamos envío nativo

    const hora = $('#horario').val();
    const asientos = parseInt($('#asientos').val(), 10);
    const tarjeta = $('input[name="tarjeta"]').val().trim();
    const titular = $('input[name="titular"]').val().trim();
    const cvv = $('input[name="cvv"]').val().trim();

    let valido = true;

    // Helper para marcar campos
    const marcar = (selector, condicion) => {
      $(selector).toggleClass('is-invalid', !condicion);
      if (!condicion) valido = false;
    };

    marcar('#horario', !!hora);
    marcar('#asientos', Number.isInteger(asientos) && asientos > 0);
    marcar('input[name="tarjeta"]', tarjeta.length > 0);
    marcar('input[name="titular"]', titular.length > 0);
    marcar('input[name="cvv"]', cvv.length > 0);

    if (!valido) return; // detener si hay errores

    reservaModal.hide();

    // Crear modal de confirmación si no existe
    if (!$('#confirmModal').length) {
      $('body').append(`
        <div class="modal fade" id="confirmModal" tabindex="-1">
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
        </div>`);
    }

    // Insertar detalles
    $('#detalleReserva').html(`
      <p><strong>Película:</strong> ${peliculaActual}</p>
      <p><strong>Horario:</strong> ${hora}</p>
      <p><strong>Asientos:</strong> ${asientos}</p>
      <hr>
      <p class="text-success">Pago procesado (simulado) ✔</p>
    `);

    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    confirmModal.show();
  });
});

console.log("jQuery funcionando 🌟");
